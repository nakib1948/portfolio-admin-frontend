"use client";
import { Box, Button, Container, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  useGetAlllinkQuery,
  useUpdatelinkMutation,
} from "../../../redux/api/linkApi";

import { toast } from "react-hot-toast";
import CssBaseline from "@mui/material/CssBaseline";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import HeaderSection from "../../../components/HeaderSection/HeaderSection";
import Loading from "../../../components/Loading/Loading";

const defaultTheme = createTheme();
const UpdateLink = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data, isLoading, refetch } = useGetAlllinkQuery(undefined);
  const [updatelink, { isLoading: updating }] = useUpdatelinkMutation();
  const handleUpdateLink = async (values) => {
    try {
      const alldata = {
        email: values.email,
        phone: values.phone,
        address: values.address,
        facebook: values.facebook,
        github: values.github,
        linkdin: values.linkdin,
        resume: values.resume,
        cv: values.cv,
        profileImg: values.profileImg,
        aboutMeImg: values.aboutMeImg,
      };
      const updateResponse = await updatelink({
        data: alldata,
        id: data?.data[0]._id,
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
    <>
      <Container>
        <HeaderSection title="update link" />
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
              <form onSubmit={handleSubmit(handleUpdateLink)}>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-basic"
                        label="email"
                        variant="outlined"
                        {...register("email", {
                          required: "email is required",
                        })}
                        fullWidth
                        size="small"
                        error={!!errors.email}
                        defaultValue={data?.data[0].email}
                        helperText={errors.email?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-basic"
                        label="phone"
                        variant="outlined"
                        {...register("phone", {
                          required: "phone  is required",
                        })}
                        fullWidth
                        size="small"
                        error={!!errors.phone}
                        defaultValue={data?.data[0].phone}
                        helperText={errors.phone?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-basic"
                        label="address"
                        variant="outlined"
                        {...register("address", {
                          required: "address name is required",
                        })}
                        fullWidth
                        size="small"
                        error={!!errors.address}
                        defaultValue={data?.data[0].address}
                        helperText={errors.address?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-basic"
                        label="facebook"
                        variant="outlined"
                        {...register("facebook", {
                          required: "facebook name is required",
                        })}
                        fullWidth
                        size="small"
                        error={!!errors.facebook}
                        defaultValue={data?.data[0].facebook}
                        helperText={errors.facebook?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-basic"
                        label="github"
                        variant="outlined"
                        {...register("github", {
                          required: "github name is required",
                        })}
                        fullWidth
                        size="small"
                        error={!!errors.github}
                        defaultValue={data?.data[0].github}
                        helperText={errors.github?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-basic"
                        label="linkdin"
                        variant="outlined"
                        {...register("linkdin", {
                          required: "linkdin name is required",
                        })}
                        fullWidth
                        size="small"
                        error={!!errors.linkdin}
                        defaultValue={data?.data[0].linkdin}
                        helperText={errors.linkdin?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-basic"
                        label="resume"
                        variant="outlined"
                        {...register("resume", {
                          required: "resume name is required",
                        })}
                        fullWidth
                        size="small"
                        error={!!errors.resume}
                        defaultValue={data?.data[0].resume}
                        helperText={errors.resume?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-basic"
                        label="cv"
                        variant="outlined"
                        {...register("cv", {
                          required: "cv name is required",
                        })}
                        fullWidth
                        size="small"
                        error={!!errors.cv}
                        defaultValue={data?.data[0].cv}
                        helperText={errors.cv?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-basic"
                        label="profileImg"
                        variant="outlined"
                        {...register("profileImg", {
                          required: "profileImg name is required",
                        })}
                        fullWidth
                        size="small"
                        error={!!errors.profileImg}
                        defaultValue={data?.data[0].profileImg}
                        helperText={errors.profileImg?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-basic"
                        label="aboutMeImg"
                        variant="outlined"
                        {...register("aboutMeImg", {
                          required: "aboutMeImg name is required",
                        })}
                        fullWidth
                        size="small"
                        error={!!errors.aboutMeImg}
                        defaultValue={data?.data[0].aboutMeImg}
                        helperText={errors.aboutMeImg?.message}
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

export default UpdateLink;
