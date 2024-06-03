import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, storage } from "../Firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const convertTimestamps = (data) => {
  return {
    ...data,
    createdAt: data.createdAt?.toDate().toISOString(),
    updatedAt: data.updatedAt?.toDate().toISOString(),
  };
};

// Fetch all blogs
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...convertTimestamps(doc.data()),
      }));
      return blogs;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch a single blog
export const fetchBlog = createAsyncThunk(
  "blogs/fetchBlog",
  async (id, { rejectWithValue }) => {
    try {
      const docSnap = await getDoc(doc(db, "blogs", id));
      if (docSnap.exists()) {
        return { id: docSnap.id, ...convertTimestamps(docSnap.data()) };
      } else {
        throw new Error("Blog not found");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch blogs by category
export const fetchBlogsByCategory = createAsyncThunk(
  "blogs/fetchBlogsByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const q = query(
        collection(db, "blogs"),
        where("category", "==", category)
      );
      const querySnapshot = await getDocs(q);
      const blogs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...convertTimestamps(doc.data()),
      }));
      return blogs;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBlogsByAuthorId = createAsyncThunk(
  "blogs/fetchBlogsByAuthorId",
  async (authorId, { rejectWithValue }) => {
    try {
      // console.log("Fetching blogs for authorId:", authorId); // Add logging
      const q = query(
        collection(db, "blogs"),
        where("author.uid", "==", authorId)
      );
      const querySnapshot = await getDocs(q);
      const blogs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...convertTimestamps(doc.data()),
      }));
      // console.log("Fetched blogs:", blogs); // Add logging
      return blogs;
    } catch (error) {
      // console.error("Error fetching blogs:", error); // Add logging
      return rejectWithValue(error.message);
    }
  }
);

// Create a new blog
export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (
    { title, description, category, content, coverImg, user },
    { rejectWithValue }
  ) => {
    try {
      const imageRef = ref(storage, `blogs/${Date.now()}-${coverImg.name}`);
      await uploadBytes(imageRef, coverImg);
      const imageURL = await getDownloadURL(imageRef);

      const newBlog = {
        title,
        description,
        category,
        content,
        imageURL,
        createdAt: serverTimestamp(),
        author: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        },
      };

      const docRef = await addDoc(collection(db, "blogs"), newBlog);

      // Get the document with the server timestamp
      const createdBlog = await getDoc(docRef);

      // Convert server timestamp to a serializable format
      const createdBlogData = {
        id: docRef.id,
        ...createdBlog.data(),
        createdAt: createdBlog.data().createdAt.toDate().toISOString(), // Convert to ISO string
      };

      return createdBlogData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update an existing blog
export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, coverImg, ...updatedBlog }, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("Blog not found");
      }

      const existingBlog = docSnap.data();
      let updatedFields = { ...updatedBlog };

      if (coverImg) {
        const imageRef = ref(storage, `blogs/${Date.now()}-${coverImg.name}`);
        await uploadBytes(imageRef, coverImg);
        const imageURL = await getDownloadURL(imageRef);
        updatedFields.imageURL = imageURL;
      }

      const mergedBlog = {
        ...existingBlog,
        ...updatedFields,
        updatedAt: serverTimestamp(),
      };

      // Update the document with merged data
      await updateDoc(docRef, mergedBlog);

      // Fetch the updated document
      const updatedDocSnap = await getDoc(docRef);
      return { id, ...convertTimestamps(updatedDocSnap.data()) };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);


// Delete a blog
export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "blogs", id));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Blog slice
const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    blog: {},
    blogs: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.blog = action.payload;
      })
      .addCase(fetchBlogsByAuthorId.fulfilled, (state, action) => {
        state.blogs = action.payload;
      })
      .addCase(fetchBlogsByCategory.fulfilled, (state, action) => {
        state.blogs = action.payload;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        console.log("Updated blog data:", action.payload);
        console.log("Current blog state:", state.blogs);

        const foundBlog = state.blogs.find(
          (blog) => blog.id === action.payload.id
        );
        if (foundBlog) {
          const updatedBlogs = state.blogs.map((blog) =>
            blog.id === action.payload.id ? action.payload : blog
          );
          state.blogs = updatedBlogs;
        } else {
          console.warn("Blog to update not found:", action.payload.id);
        }
      })

      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.status = "succeeded";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
          console.log(state.error);
        }
      );
  },
});

export const { resetError, resetStatus } = blogsSlice.actions;
export default blogsSlice.reducer;
