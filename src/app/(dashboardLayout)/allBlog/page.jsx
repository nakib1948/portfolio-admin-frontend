"use client";
import HeaderSection from "../../../components/HeaderSection/HeaderSection";
import {
  useGetAllblogQuery,
  useDeleteBlogMutation,
} from "../../../redux/api/blogApi";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-hot-toast";
import Loading from "../../../components/Loading/Loading";
const AllBlog = () => {
  const { data, isLoading, refetch } = useGetAllblogQuery(undefined);
  const [deleteBlog, { isLoading: isDeleted }] = useDeleteBlogMutation();
  const handleDelete = async (id) => {
    try {
      const updateResponse = await deleteBlog(id);
      if (updateResponse?.data?.success) {
        toast.success(updateResponse.data.message);
      }
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
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
            <Button onClick={() => handleDelete(row._id)} sx={{ color: "red" }}>
              delete
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <Box>
      <HeaderSection title="All Blog" subTitle="" />
      {isDeleted && (
        <Box display="flex" justifyContent="center">
          <Loading />
        </Box>
      )}
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
