// import { uploadQueryApi } from "../../store/Slices/queries";

export const uploadFile = async (file: any) => {
    try {
      const form = new FormData();
      form.append('file', file);
      // const response = await uploadQueryApi(form);
      // return response;
    } catch (error) {
       return error;
    }
};
