import { ReactNode, useState } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import MuiStepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { palette } from "@/theme/palette";
import { useFormContext } from "react-hook-form";
import { CircularProgress } from "@mui/material";

export const Stepper = ({
  steps,
  completed,
  shouldValidateForm,
  handleReset: CustomHandleReset,
}: StepperProps) => {
  const { handleSubmit } = useFormContext();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [loading, setLoading] = useState(false);

  const isStepOptional = (step: number) => {
    return step === 5;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    try {
      const customNext = steps[activeStep].customNext;
      if (customNext) {
        setLoading(true);
        await customNext();
      }

      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <MuiStepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Opcional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={step.label} {...stepProps} expanded={true}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </Step>
          );
        })}
      </MuiStepper>
      <Box
        sx={{
          backgroundColor: palette.common.white,
          width: { sm: "80%" },
          margin: "auto",
          padding: "20px",
          mt: "30px",
          borderRadius: "10px",
        }}
      >
        {activeStep === steps.length ? (
          <>
            {completed}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={CustomHandleReset || handleReset}
                variant="contained"
              >
                Finalizar
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography textAlign="center" variant="h3">
              {steps[activeStep].title}
            </Typography>
            <Typography textAlign="center" variant="body2">
              {steps[activeStep].subTitle}
            </Typography>
            {steps[activeStep].component}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              {!steps[activeStep].disableBack && (
                <>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Atrás
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                </>
              )}
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Saltar
                </Button>
              )}
              <Box
                {...steps[activeStep].boxButtonProps}
                sx={{
                  m: 1,
                  position: "relative",
                  ...steps[activeStep].boxButtonProps?.sx,
                }}
              >
                <Button
                  onClick={
                    shouldValidateForm ? handleSubmit(handleNext) : handleNext
                  }
                  disabled={loading}
                  {...steps[activeStep].buttonProps}
                >
                  {activeStep === steps.length - 1
                    ? steps[activeStep].customLabelNext || "Finalizar"
                    : steps[activeStep].customLabelNext || "Siguiente"}
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export interface IStep {
  label: string;
  title: string;
  subTitle: string;
  component: ReactNode;
  customNext?: () => Promise<void>;
  customLabelNext?: string;
  buttonProps?: ButtonProps;
  boxButtonProps?: BoxProps;
  disableBack?: boolean;
}

interface StepperProps {
  steps: IStep[];
  completed: ReactNode;
  shouldValidateForm?: boolean;
  handleReset?: () => void;
}

Stepper.defaultProps = {
  shouldValidateForm: true,
};
