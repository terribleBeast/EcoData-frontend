import {
  Assignment,
  ImageSearch,
  LocationOn,
  PeopleAlt,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Fade,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

let TIMEOUT = 500;
const ChapterCards = () => {
  const cardsActions = [
    {
      title: "Сбор данных",
      srcPhoto: "leafs.jpg",
      altPhoto: "фото листьев на шаблоне",
      description:
        "Система будет способна обрабатывать специальные фотографии листьев. Это позволит увеличить скорость обработки.",
    },
    {
      title: "Анализ данных",
      srcPhoto: "table.jpg",
      altPhoto: "фото таблицы с данным",
      description:
        "После обработки фотографий, система EcoData предоставит морфологические признаки листьев. Больше не нужно измерять их и записывать измерения вручную!",
    },
    {
      title: "Формирование отчетов",
      srcPhoto: "phoh",
      altPhoto: "фото отчета",
      description:
        "Возможно формирование отчетов по проведенному исследованию. В него будет включена информация о прововдивших его исследователях, датах проведениях, места проведения, факторах закрязнения и результатах.",
    },
  ];

  return (
    <Box className="cards-container">
      {cardsActions.map((card, index) => (
        <Paper
          className="card"
          key={index}
          sx={{
            "&:hover": { boxShadow: 3 },
          }}
        >
          <CardHeader title={card.title} />
          <CardContent>
            <Typography>{card.description}</Typography>
          </CardContent>
        </Paper>
      ))}
    </Box>
  );
};

const ChapterGetStarted = () => {
  const navigate = useNavigate();
  const steps = [
    {
      icon: <Assignment fontSize="large" />,
      title: "Создайте исследование",
      text: "Зарегистрируйте новое исследование в системе.",
      action: "Создать",
      to: "researches",
    },
    {
      icon: <ImageSearch fontSize="large" />,
      title: "Загрузите фотографию",
      text: "Это позволит получить морфологические признаки листа для Вашего исследования.",
      action: "Загрузить",
      to: "/analyzer",
    },
    {
      icon: <LocationOn fontSize="large" />,
      title: "Выберите локацию",
      text: "Выберите локацию из списка, чтобы узнать информацию об исследованих, которые там проводились.",
      action: "Выбрать",
      to: "/locations",
    },
    {
      icon: <PeopleAlt fontSize="large" />,
      title: "Найдите единомышленников",
      text: "Объединяйтесь с другими пользователями для проведених совместных исследований.",
      action: "Найти",
      to: "/researchers",
    },
  ];

  return (
    <Grid container spacing={3}>
      {steps.map((step, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <Fade
            in
            timeout={(index + 1) * TIMEOUT}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box
              sx={{
                bgcolor: "white",
                p: 3,
                borderRadius: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                aligns: "center",
                textAlign: "center",
                boxShadow: 1,
                "&:hover": { boxShadow: 3 },
              }}
            >
              <Box sx={{ color: "#2e7d32", mb: 2 }}>{step.icon}</Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {step.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                {step.text}
              </Typography>
              <Button
                variant="outlined"
                color="success"
                size="small"
                onClick={() => navigate(step.to)}
              >
                {step.action}
              </Button>
            </Box>
          </Fade>
        </Grid>
      ))}
    </Grid>
  );
};

const chapters = [
  {
    title: "Что такое EcoData?",
    content: (
      <Typography className="chapter-description">
        <strong>EcoData</strong> - система для исследования растительных
        биоиндикаторов. Она помогает собрать данных об экологической обстановке
        в разных локациях.
      </Typography>
    ),
  },
  {
    title: "Какую работу можно ускорить?",
    content: <ChapterCards />,
  },
  {
    title: "С чего начать?",
    content: <ChapterGetStarted />,
  },
];

const Home = () => {
  return (
    <Box className="page-layout">
      <Fade in timeout={TIMEOUT}>
        <Typography className="page-title">Система EcoData</Typography>
      </Fade>

      <Box className="main-page-content">
        {chapters.map((chapter, index) => (
          <Paper className="chapter" key={index}>
            <Fade in timeout={(index + 1) * TIMEOUT}>
              <Typography className="chapter-title">{chapter.title}</Typography>
            </Fade>
            <Fade in timeout={(index + 2) * TIMEOUT}>
              <Box className="chapter-content">{chapter.content}</Box>
            </Fade>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
