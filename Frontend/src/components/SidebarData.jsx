import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ArticleIcon from '@mui/icons-material/Article';

export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/"
    },
    {
        title: "Customers",
        icon: <PeopleAltIcon />,
        link: "/customer"
    },
    {
        title: "Representative",
        icon: <SupportAgentIcon />,
        link: "/representative"
    },
    {
        title: "Contract",
        icon: <ArticleIcon />,
        link: "/contract"
    },
];

