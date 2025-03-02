import React, { useState } from "react";
import {
    Container,
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography
} from "@mui/material";
import SelectAddress from "../selectAddress/SelectAddress";
import ConformPage from "../conformPage/ConformPage";



const steps = ["Items", "Select Address", "Confirm Order"];
const OrderPage = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [selectedAddress, setSelectedAddress] = useState()

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };


    const renderStepperBody = () => {
        if(activeStep === 1) {
            return <SelectAddress onChangeAddress={setSelectedAddress} selectedAddress={selectedAddress}/>
        }

        if(activeStep == 2) {
            return <ConformPage selectedAddress={selectedAddress}/>
        }
     

        return null
    }



    return (
        <Container maxWidth="md">
            <Box mt={5}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box mt={3}>
                    {activeStep === steps.length ? (
                        <Typography variant="h5" color="primary">
                            Your order is confirmed.
                        </Typography>
                    ) : (
                        <div>
                            {renderStepperBody()}
                        {activeStep !==2 &&(
                            <div style={{textAlign: "center"}}>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                Next
                                </Button>
                                </div>
                                )}
                        </div>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default OrderPage;
