import AddCircleIcon from '@mui/icons-material/AddCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddLinkIcon from '@mui/icons-material/AddLink';
import WebIcon from '@mui/icons-material/Web';
import BookIcon from '@mui/icons-material/Book';
export const drawerItems = () => {
    const roleData = [];
    roleData.push(
        {
            title: "Add Project",
            path: `/addProject`,
            icon: AddCircleIcon,
        },
        {
            title: "All Project",
            path: `/allProject`,
            icon: WebIcon,
        },
        {
            title: "Add Skills",
            path: `/addSkill`,
            icon: AddCircleIcon,
        },
        {
            title: "All Skill",
            path: `/allSkill`,
            icon: InventoryIcon,
        },
        {
            title: "Update link",
            path: `/updateLink`,
            icon: AddLinkIcon,
        },
        {
            title: "Add Blog",
            path: `/addBlog`,
            icon: AddCircleIcon,
        },
        {
            title: "All Blogs",
            path: `/allBlog`,
            icon: BookIcon,
        },
    );
    return roleData;
};