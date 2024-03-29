import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";

import { Alert, Button, Stack } from "@mui/material";
import RHFTextField from "../../components/hook-form/RHFTextField";

const ResetPasswordForm = () => {
  const ResetPasswordSchema = Yup.object().shape({
    phone: Yup.string().required("Phone is required"),
  });

  const defaultValues = {
    phone: "123456789",
  };

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      //submit data backend
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <RHFTextField name="phone" label="Phone number " />
        <Button
          fullWidth
          color="inherit"
          size="large"
          type="summit"
          variant="contained"
          sx={{
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          Send Request
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default ResetPasswordForm;
