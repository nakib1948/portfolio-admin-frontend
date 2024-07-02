"use client";
import { Box, Button, Container, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-hot-toast";
import CssBaseline from "@mui/material/CssBaseline";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { imgUpload } from "../../../services/imgUpload";
import HeaderSection from "../../../components/HeaderSection/HeaderSection";
import { useAddProjectMutation } from "../../../redux/api/projectApi";
import { useState } from "react";
import Loading from "../../../components/Loading/Loading"

const defaultTheme = createTheme();
const AddProjectPage = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [addProject] = useAddProjectMutation();
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
    <>
      <Container>
        <HeaderSection title="Add a project" />
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
              {loading && <Loading/>}
              <form onSubmit={handleSubmit(handleAddProject)}>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-basic"
                        label="Website Name"
                        variant="outlined"
                        {...register("name", {
                          required: "website name is required",
                        })}
                        fullWidth
                        size="small"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-basic"
                        label="Client Site Github Link"
                        variant="outlined"
                        {...register("client", {
                          required: "client site Github link is required",
                        })}
                        fullWidth
                        size="small"
                        error={!!errors.client}
                        helperText={errors.client?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-basic"
                        label="Server Site Github Link"
                        variant="outlined"
                        {...register("server", {
                          required: "Server Site Github Link is required",
                        })}
                        fullWidth
                        size="small"
                        error={!!errors.server}
                        helperText={errors.server?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-basic"
                        label="Website Link"
                        variant="outlined"
                        {...register("liveSite", {
                          required: "liveSite is required",
                        })}
                        fullWidth
                        size="small"
                        error={!!errors.liveSite}
                        helperText={errors.liveSite?.message}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Button
                        sx={{ py: 1 }}
                        variant="contained"
                        fullWidth
                        component="label"
                      >
                        Upload Website Image
                        <input
                          {...register("image", {
                            required: "image is required",
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
                    <Grid item xs={12} sm={6}>
                      <Button
                        sx={{ py: 1 }}
                        variant="contained"
                        fullWidth
                        component="label"
                      >
                        Upload Website Cover Image
                        <input
                          {...register("coverImage", {
                            required: "coverImage is required",
                          })}
                          type="file"
                          hidden
                        />
                      </Button>
                      {errors.coverImage && (
                        <small className="text-red-500" role="alert">
                          {errors.coverImage.message}
                        </small>
                      )}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-basic"
                        label="Website Description"
                        multiline
                        variant="outlined"
                        {...register("description", {
                          required: "description is required",
                        })}
                        fullWidth
                        error={!!errors.description}
                        helperText={errors.description?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-basic"
                        label="Website Details"
                        multiline
                        variant="outlined"
                        {...register("details", {
                          required: "details is required",
                        })}
                        fullWidth
                        error={!!errors.details}
                        helperText={errors.details?.message}
                      />
                    </Grid>
                  </Grid>
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
    </>
  );
};

export default AddProjectPage;
