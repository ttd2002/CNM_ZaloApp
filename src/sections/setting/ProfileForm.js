import React, { useCallback, useState } from "react";
import {
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { Alert, Button, Stack } from "@mui/material";
import RHFTextField from "../../components/hook-form/RHFTextField";
import RHFText from "../../components/hook-form/RHFText";
import { useDispatch, useSelector } from "react-redux";
import { RHFUploadAvatar } from "../../components/hook-form/RHFUpload";
const ProfileForm = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const { user } = useSelector((state) => state.app);
  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
    gender: Yup.string()
      .oneOf(["male", "female"])
      .required("male or female"),
    avatarUrl: Yup.string().required("Avatar URL is required").nullable(true),
  });
  const defaultValues = {
    name: "",
    about: "",
    gender:"",
    birthday:"",
    avatarUrl: "",
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    try {
      //submit data backend
      console.log("Data", data);
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("avatarUrl", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack spacing={3}>
          {/* {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )} */}
          <RHFUploadAvatar
            name="avatar"
            maxSize={3145728}
            onDrop={handleDrop}
          />
          <RHFTextField name="name" label="Name" helperText={""} />
          <RHFTextField name="gender" label="Gender" />
        <Typography>Birth day</Typography>
        <RHFText name="birthDate" type="date"/>
          <RHFTextField
            multiline
            rows={4}
            maxRows={5}
            name="about"
            label="About"
          />
        </Stack>
        <Stack direction={"row"} justifyContent={"end"}>
          <Button color="primary" size="large" type="submit" variant="outlined">
            Save
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
