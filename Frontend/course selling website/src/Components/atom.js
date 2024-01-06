import { atom } from 'recoil';


export const titleState = atom({
    key: "titleState",
    default: "",
  });

  export  const descriptionState = atom({
    key: "descriptionState",
    default: "",
  });

  export  const imageState = atom({
    key: "imageState",
    default: "",
  });
  
  export  const priceState = atom({
    key: "priceState",
    default: "",
  });
  
  export const currentCourseState = atom({
    key: "currentCourseState",
    default: {},
  });
  