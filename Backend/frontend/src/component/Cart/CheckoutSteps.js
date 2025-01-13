import React from 'react'
// import { useParams } from 'react-router-dom';

import { Typography, Stepper, StepLabel, Step } from "@material-ui/core"
import { MdLocalShipping } from "react-icons/md";
import { MdLibraryAddCheck } from "react-icons/md";
import { MdAccountBalanceWallet } from "react-icons/md";

import "./CheckotSteps.css";

const CheckoutSteps = ({ activeSteps }) => {
    // const params = useParams();

    const steps = [
        {
            label: <Typography className='checkoutStepsLabel'>Shipping Details</Typography>,
            icon: <MdLocalShipping />

        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <MdLibraryAddCheck />,

        },
        {
            label: <Typography>Payment</Typography>,
            icon: <MdAccountBalanceWallet />
            ,

        },
    ]

    const styles = {
        boxSixing: "border-box"
    }

    return (
        <>
            <Stepper
                alternativeLabel
                activeStep={activeSteps}
                style={styles}
            >
                {steps.map((items, index) => (
                    <Step
                        active={activeSteps === index ? true : false}
                        completed={activeSteps >= index ? true : false}
                        key={index}>
                        <StepLabel
                            style={{
                                color: activeSteps >= index ? "rgba(0,0,0,0.869)" : "rgba(0,0,0,0.269)"
                            }}
                            icon={items.icon}
                        >
                            {items.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </>
    )
}

export default CheckoutSteps