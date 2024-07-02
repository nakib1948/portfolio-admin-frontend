"use client";
import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { imgUpload } from "../../../services/imgUpload";
import { toast } from "react-hot-toast";
import CssBaseline from "@mui/material/CssBaseline";
import { useForm, FieldValues, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import HeaderSection from "../../../components/HeaderSection/HeaderSection";

const defaultTheme = createTheme();
const AddBlog = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  //   const [createFoundItem] = useCreateFoundItemMutation();
  const handleAddProject = async (values) => {
    setLoading(true);

    try {
      const imgUrl = await imgUpload(values.image[0]);
      const coverImage = await imgUpload(values.coverImage[0]);
      const data = {
        name: values.name,
        description: values.description,
        details: values.details,
        client: values.client,
        server: values.server,
        liveSite: values.liveSite,
        coverImage,
        image: [imgUrl],
      };
      const res = await addProject(data);
      if (res.data.success) {
        toast.success(res.data.message);
        reset();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
    finally {
      setLoading(false); 
    }
  };
  return (
    <Container>
      <HeaderSection title="Write a Blog" />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <form onSubmit={handleSubmit(handleAddProject)}>
              <Box>
                <Grid  mb={3} container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="outlined-basic"
                      label="Blog Title"
                      variant="outlined"
                      {...register("title", {
                        required: "title name is required",
                      })}
                      fullWidth
                      size="small"
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      sx={{ py: 1 }}
                      variant="contained"
                      fullWidth
                      component="label"
                    >
                      Upload Cover Image
                      <input
                        {...register("image", {
                          required: "cover image is required",
                        })}
                        type="file"
                        hidden
                      />
                    </Button>
                    {errors.image && (
                      <small className="text-red-500" role="alert">
                        {errors.image.message}
                      </small>
                    )}
                  </Grid>
                </Grid>
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  tabIndex={1} // tabIndex of textarea
                  onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={(newContent) => setContent(newContent)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Container>
      </ThemeProvider>
    </Container>
  );
};

export default AddBlog;
