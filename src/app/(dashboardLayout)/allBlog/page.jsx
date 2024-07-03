"use client";
import HeaderSection from "../../../components/HeaderSection/HeaderSection";
import { useGetAllblogQuery } from "../../../redux/api/blogApi";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-hot-toast";
import Loading from "../../../components/Loading/Loading";
const AllBlog = () => {
  const { data, isLoading, refetch } = useGetAllblogQuery(undefined);
  
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
    { field: "title", headerName: "Blog Title", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
   
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
      <HeaderSection title="All Blog" subTitle="" />
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

export default AllBlog;
