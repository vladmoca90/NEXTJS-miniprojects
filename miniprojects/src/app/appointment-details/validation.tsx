export const emailValid = new RegExp(
    "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" // Corrected dot and TLD requirement
);

export const passValid = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9]).{6,}$" // Kept as is for the original requirement
);
