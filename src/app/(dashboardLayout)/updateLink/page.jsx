"use client";
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
import { imgUpload } from "@/services/imgUpload";
import { toast } from "react-hot-toast";
import CssBaseline from "@mui/material/CssBaseline";
import { useForm, FieldValues, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { getUserInfo } from "@/services/authService";
import HeaderSection from "../../../components/HeaderSection/HeaderSection";

const defaultTheme = createTheme();
const UpdateLink = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  //   const [createFoundItem] = useCreateFoundItemMutation();
  const handleAddProject = async (values) => {
    console.log(values)
    //     const user = await getUserInfo();
    //     const imgUrl = await imgUpload(values.image[0]);
    //     const data: FieldValues = {
    //       itemCategory: values.itemCategory,
    //       foundItemName: values.foundItemName,
    //       description: values.description,
    //       date: values.date,
    //       location: values.location,
    //       district: values.district,
    //       email: user.email,
    //       phone: values.phone,
    //       image: imgUrl,
    //     };
    //     try {
    //       const res = await createFoundItem(data);
    //       if (res.data.success) {
    //         toast.success(res.data.message);
    //         reset();
    //       } else {
    //         toast.error(res.data.message);
    //       }
    //     } catch (err: any) {
    //       toast.error(err.message);
    //     }
  };
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
              <form onSubmit={handleSubmit(handleAddProject)}>
                <Box >
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
                        helperText={errors.email?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-basic"
                        label="phone"
                        type="number"
                        variant="outlined"
                        {...register("phone", {
                          required: "phone name is required",
                        })}
                        fullWidth
                        size="small"
                        error={!!errors.phone}
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
