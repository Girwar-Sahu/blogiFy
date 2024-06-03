import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../Firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  getDoc
} from "firebase/firestore";

const convertTimestamps = (data) => {
  return {
    ...data,
    createdAt: data.createdAt && typeof data.createdAt.toDate === 'function' 
      ? data.createdAt.toDate().toISOString() 
      : data.createdAt,
    updatedAt: data.updatedAt && typeof data.updatedAt.toDate === 'function' 
      ? data.updatedAt.toDate().toISOString() 
      : data.updatedAt,
  };
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (blogId) => {
    const querySnapshot = await getDocs(
      collection(db, "blogs", blogId, "comments")
    );
    const comments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...convertTimestamps(doc.data()),
    }));
    return comments;
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ blogId, content, user }) => {
    const newComment = {
      content,
      createdAt: serverTimestamp(),
      author: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      },
    };

    const docRef = await addDoc(
      collection(db, "blogs", blogId, "comments"),
      newComment
    );

    // Fetch the newly added comment to get the correct timestamps
    const docSnapshot = await getDoc(docRef);
    const newCommentData = convertTimestamps(docSnapshot.data());

    return { id: docRef.id, ...newCommentData };
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ blogId, commentId }) => {
    await deleteDoc(doc(db, "blogs", blogId, "comments", commentId));
    return commentId;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    cStatus: "idle",
    cError: null,
  },
  reducers: {
    resetError: (state) => {
      state.cError = null;
    },
    resetStatus: (state) => {
      state.cStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload
        );
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.cStatus = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.cStatus = "succeeded";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.cStatus = "failed";
          state.cError = action.error.message;
        }
      );
  },
});

export const {resetError, resetStatus} = commentsSlice.actions
export default commentsSlice.reducer;
