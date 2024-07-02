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
import { toast } from "react-hot-toast";
import CssBaseline from "@mui/material/CssBaseline";
import { useForm, FieldValues, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import HeaderSection from "../../../components/HeaderSection/HeaderSection";
import { useAddskillMutation } from "../../../redux/api/skillApi";
import { useState } from "react";
import Loading from "../../../components/Loading/Loading";
import { imgUpload } from "../../../services/imgUpload";
const defaultTheme = createTheme();
const AddSkill = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [addSkill] = useAddskillMutation();
  const handleAddSkill = async (values) => {
    setLoading(true);
    try {
      const imgUrl = await imgUpload(values.image[0]);
      const data = {
        name: values.name,
        percentage: values.percentage,
        image: imgUrl,
      };
      const res = await addSkill(data);
      if (res.data.success) {
        toast.success(res.data.message);
        reset();
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
    <>
      <Container>
        <HeaderSection title="Add Skill" />
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
              <form onSubmit={handleSubmit(handleAddSkill)}>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-basic"
                        label="Skill Name"
                        variant="outlined"
                        {...register("name", {
                          required: "Skill name is required",
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
                        label="percentage"
                        type="number"
                        inputProps={{ min: 0, max: 100 }}
                        variant="outlined"
                        {...register("percentage", {
                          required: "percentage name is required",
                          validate: {
                            value: (value) =>
                              (Number(value) >= 0 && Number(value) <= 100) ||
                              "Percentage must be between 0 and 100",
                          },
                        })}
                        fullWidth
                        size="small"
                        error={!!errors.percentage}
                        helperText={errors.percentage?.message}
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

export default AddSkill;
