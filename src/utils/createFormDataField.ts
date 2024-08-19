const createFormDataField = (formData: FormData, key: string) => {
  return {
    [key]: formData.get(key),
  } as const;
};

export default createFormDataField;
