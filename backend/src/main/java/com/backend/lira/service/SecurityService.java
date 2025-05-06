package com.backend.lira.service;

import com.backend.lira.DTO.UserPasswordRecoverDTO;
import com.backend.lira.DTO.UserSignInDTO;
import com.backend.lira.DTO.UserSignUpDTO;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {

    public String signUp(UserSignUpDTO userSignUpDTO){
        return "Usuarior " + userSignUpDTO.name() + " criado" ;
    }

    public String signIn(UserSignInDTO userSignInDTO){
        if(userSignInDTO.email().equals("loremipsum@loremipsum.com") && userSignInDTO.password().equals("teste"))
            return "Usuario Fulano logado" ;
        else
            return "Senha/Email invalido" ;
    }

    public String recoverPassword(UserPasswordRecoverDTO userPasswordRecoverDTO){
        if(userPasswordRecoverDTO.email().equals("loremipsum@loremipsum.com") && userPasswordRecoverDTO.code().equals("506573"))
            return "Sua senha é teste" ;
        else
            return "Codigo invalido!" ;
    }
}
