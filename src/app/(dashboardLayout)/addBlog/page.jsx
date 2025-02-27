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
import { useAddblogMutation } from "../../../redux/api/blogApi";
import Loading from "../../../components/Loading/Loading";

const defaultTheme = createTheme();
const AddBlog = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [addblog] = useAddblogMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );

  const handleAddBlog = async (values) => {
    setLoading(true);
    try {
      const date = new Date();
      const options = { day: "numeric", month: "long", year: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options);

      const imgUrl = await imgUpload(values.image[0]);
      const data = {
        title: values.title,
        description: content,
        image: imgUrl,
        date:formattedDate
      };
      const res = await addblog(data);
      if (res.data.success) {
        toast.success(res.data.message);
        reset();
        setContent("")
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
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
            {loading && <Loading />}
            <form onSubmit={handleSubmit(handleAddBlog)}>
              <Box>
                <Grid mb={3} container spacing={2}>
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
