import { useState, useEffect } from "react";
import {
    Button,
    Stack,
    Typography,
    Container,
    Card,
    Stepper,
    Step,
    Box,
    StepLabel,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import axios from "axios";

import config from "../config";
import CallEntry from "../components/prediction/CallEntry";
import Page from "../components/general/Page";
import { Probabilities } from "../components/charts";

const PREDICTION_URL = `${config.BatchLayerURL}/api/predictCall`;
const BUILD_MODEL_URL = `${config.BatchLayerURL}/api/buildModel`;
const GET_MODEL_INFO_URL = `${config.BatchLayerURL}/api/modelInfo`;

export default function PredictionPage() {
    const [building, setBuilding] = useState(false);
    const [finishBuilding, setFinishBuilding] = useState(false);
    const [isPredicting, setPredicting] = useState(false);
    const [modelName, setModelName] = useState("");
    const [modelInfo, setModelInfo] = useState({});
    const [hasModel, setHasModel] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [prediction, setPrediction] = useState(null);
    const [callData, setCallData] = useState({
        name: "",
        age: "",
        gender: "זכר",
        city: "",
        product: "וניל",
        lang: "אנגלית"
    });

    const handleBuildModel = () => {
        setActiveStep(0);
        setBuilding(true);
        setTimeout(() => {
            setActiveStep(1);
        }, 4000);
        axios
            .get(BUILD_MODEL_URL)
            .then((res) => {
                setBuilding(false);
                setModelName(res.data.modelInfo.resource);
                console.log(res);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setBuilding(false);
                setActiveStep(3);
                setFinishBuilding(true);
            });
    };

    const handlePredictCall = () => {
        setPredicting(true);
        axios
            .post(PREDICTION_URL, callData)
            .then((res) => {
                try {
                    const probs = res.data.predictionInfo.object.probabilities.map((p) => p[1]);
                    console.log(probs);
                    setPrediction(probs);
                } catch (error) {
                    setPrediction(null);
                }
            })
            .finally(() => {
                setPredicting(false);
            });
    };

    const fetchModelInfo = async () => {
        try {
            const res = await axios.get(GET_MODEL_INFO_URL);
            console.log(res);
            setModelName(res.data.modelInfo.resource);
            setModelInfo(res.data.modelInfo);
            setHasModel(true);
        } catch (error) {
            setModelName("לא נמצא מודל")
        }
    };

    useEffect(() => {
        fetchModelInfo();
    }, []);

    const steps = ["משיג את כל נתוני השיחות", "יוצר קשר עם שרתי BigML", "מודל חיזוי נוצר בהצלחה"];

    return (
        <Page title="לוח חיזוי קניות | CallCenter">
            <Container maxWidth="lg">
                <h1>לוח חיזוי קניות</h1>
                <Container sx={{ marginTop: "30px" }}>
                    <Card sx={{ marginBottom: "30px", padding: "20px" }}>
                        <Stack alignItems="center" justifyContent="center" mb={5}>
                            {building ? (
                                <Button disabled>בונה מודל חיזוי...</Button>
                            ) : (
                                <Button variant="contained" onClick={handleBuildModel}>
                                    בניית מודל חיזוי חדש
                                </Button>
                            )}
                            {(building || finishBuilding) && (
                                <Box sx={{ width: "100%", margin: "20px" }}>
                                    <Stepper activeStep={activeStep}>
                                        {steps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel>{`>>  ${label}`}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Box>
                            )}
                            {hasModel ? (
                                <>
                                    <Typography variant="h5" mt={5} mb={2}>פרטי מודל החיזוי האחרון שנוצר במערכת</Typography>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">שם המודל</TableCell>
                                                <TableCell align="center">מספר השיחות</TableCell>
                                                <TableCell align="center">גודל</TableCell>
                                                <TableCell align="center">תאריך יצירה</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="center">{modelName}</TableCell>
                                                <TableCell align="center">{modelInfo.object.rows}</TableCell>
                                                <TableCell align="center">{`${(modelInfo.object.size/1000).toFixed(2)} KB`}</TableCell>
                                                <TableCell align="center">{modelInfo.object.created}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </>
                            ) : (
                                <Typography>
                                    נדרש לבנות מודל חיזוי חדש לפני חיזוי אופי הקנייה
                                </Typography>
                            )}
                        </Stack>
                    </Card>
                    {/* כפתור סיום שיחה */}
                    <Container align="center" sx={{ margin: "30px" }}>
                        <CallEntry callData={callData} setCallData={setCallData} />
                        {isPredicting ? (
                            <Button disabled>מבצע חיזוי...</Button>
                        ) : (
                            <Button disabled={!hasModel} variant="contained" onClick={handlePredictCall}>
                                חזה קנייה
                            </Button>
                        )}
                    </Container>
                    <Card>
                        {prediction ? (
                            <Probabilities data={prediction} />
                        ) : (
                            <Typography align="center" my={1}>הזן פרטי הקנייה ולחץ על הכפתור מעל כדי לחזות את הקנייה הבאה</Typography>
                        )}
                    </Card>
                </Container>
            </Container>
        </Page>
    );
}
