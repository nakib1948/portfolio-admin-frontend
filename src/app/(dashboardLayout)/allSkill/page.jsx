"use client";
import HeaderSection from "../../../components/HeaderSection/HeaderSection";
import { useAllSkillQuery } from "../../../redux/api/skillApi";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-hot-toast";
import Loading from "../../../components/Loading/Loading";
import { useRouter } from "next/navigation";
const AllSkill = () => {
  const { data, isLoading, refetch } = useAllSkillQuery(undefined);
  const router = useRouter()
  const updateProject = (id)=>{
    router.push(`allSkill/${id}`);
  }
  
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
      <HeaderSection title="All Skill"/>
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

export default AllSkill;
