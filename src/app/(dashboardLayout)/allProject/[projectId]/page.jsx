"use client";
import { Box, Button, Container, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-hot-toast";
import CssBaseline from "@mui/material/CssBaseline";
import { useForm, FieldValues, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import HeaderSection from "../../../../components/HeaderSection/HeaderSection";
import { useState } from "react";
import { imgUpload } from "../../../../services/imgUpload";
const defaultTheme = createTheme();
import Loading from "../../../../components/Loading/Loading";
import {
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
} from "../../../../redux/api/projectApi";

const SingleProject = ({ params }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data, isLoading, refetch } = useGetSingleProjectQuery(
    params.projectId
  );
  const [updateProject, { isLoading: updating }] = useUpdateProjectMutation();
  const handleUpdateProject = async (values) => {
    try {
      let imgUrl = data?.data.image;
      if (values.image.length > 0) {
        imgUrl = await imgUpload(values.image[0]);
      }
      const alldata = {
        name: values.name,
        description: values.description,
        details: values.details,
        client: values.client,
        server: values.server,
        liveSite: values.liveSite,
        coverImage: values.coverImage,
        image: [imgUrl],
      };
      const updateResponse = await updateProject({
        data: alldata,
        id: params.projectId,
      });
      if (updateResponse?.data?.success) {
        toast.success(updateResponse.data.message);
      }
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <Loading />
      </Box>
    );
  }

  return (
    <Container>
      <HeaderSection title="update project" />
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
            {updating && <Loading />}
            <form onSubmit={handleSubmit(handleUpdateProject)}>
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
                      defaultValue={data?.data?.name}
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
                      defaultValue={data?.data?.client}
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
                      defaultValue={data?.data?.server}
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
                      defaultValue={data?.data?.liveSite}
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
                      Upload more Website Image
                      <input {...register("image")} type="file" hidden />
                    </Button>
                    {errors.image && (
                      <small className="text-red-500" role="alert">
                        {errors.image.message}
                      </small>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="outlined-basic"
                      label="Change coverImage"
                      multiline
                      variant="outlined"
                      {...register("coverImage", {
                        required: "coverImage link is required",
                      })}
                      fullWidth
                      error={!!errors.coverImage}
                      defaultValue={data?.data?.coverImage}
                      helperText={errors.coverImage?.message}
                    />
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
                      defaultValue={data?.data?.description}
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
                      defaultValue={data?.data?.details}
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
  );
};

export default SingleProject;
