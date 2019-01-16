import t  from "tcomb-form-native";
export default formValidation = {
    email:t.refinement(t.String, (emailIngresado)=>{
        return /@/.test(emailIngresado);
    }),
    password:t.refinement(t.String, (passIngresado)=>{
        return passIngresado.length >= 6;
    })
}