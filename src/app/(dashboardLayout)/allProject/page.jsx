"use client";
import HeaderSection from "../../../components/HeaderSection/HeaderSection";
import { useGetAllProjectQuery } from "../../../redux/api/projectApi";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-hot-toast";
import Loading from "../../../components/Loading/Loading";
import { useState } from "react";
import { useRouter } from "next/navigation";
const AllProject = () => {
  const { data, isLoading, refetch } = useGetAllProjectQuery(undefined);
  const router = useRouter()
  const updateProject = (id)=>{
    router.push(`allProject/${id}`);
  }
  
  const handleDelete = async (id) => {
    // const updateData = {
    //   id,
    //   status,
    // };
    // try {
    //   const updateResponse = await updateStatus(updateData);
    //   if (updateResponse.data.success) {
    //     toast.success(updateResponse.data.message);
    //   }
    //   refetch();
    // } catch (error: any) {
    //   toast.error(error.message);
    // }
  };
  const columns = [
    { field: "name", headerName: "Website Name", flex: 1 },
    {
      field: "update",
      headerName: "update",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <>
            <Button onClick={()=>updateProject(row._id)}>update</Button>
          </>
        );
      },
    },
    {
      field: "delete",
      headerName: "delete",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <>
            <Button sx={{ color: "red" }}>delete</Button>
          </>
        );
      },
    },
  ];

  return (
    <Box>
      <HeaderSection title="All Project" subTitle="" />
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <Loading />
        </Box>
      ) : (
        <DataGrid
          sx={{ mt: 2 }}
          hideFooterPagination
          rows={data?.data || []}
          columns={columns}
          getRowId={(row) => row._id}
        />
      )}
    </Box>
  );
};

export default AllProject;
