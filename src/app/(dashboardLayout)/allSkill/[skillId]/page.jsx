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
    useGetSingleSkillQuery,
  useUpdateSkillMutation,
} from "../../../../redux/api/skillApi";

const SingleSkill = ({ params }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data, isLoading, refetch } = useGetSingleSkillQuery(
    params.skillId
  );
  const [updateSkill, { isLoading: updating }] = useUpdateSkillMutation();
  const handleUpdateSkill = async (values) => {
    try {
      let imgUrl = data?.data.image;
      if (values.image.length > 0) {
        imgUrl = await imgUpload(values.image[0]);
      }
      const alldata = {
        name: values.name,
        percentage: values.percentage,
        image: imgUrl,
      };
      const updateResponse = await updateSkill({
        data: alldata,
        id: params.skillId,
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
            <form onSubmit={handleSubmit(handleUpdateSkill)}>
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
                        defaultValue={data?.data?.name}
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
                        defaultValue={data?.data?.percentage}
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
                          {...register("image")}
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
  );
};

export default SingleSkill;
