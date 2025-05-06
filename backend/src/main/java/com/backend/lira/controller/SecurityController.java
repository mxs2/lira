package com.backend.lira.controller;

import com.backend.lira.DTO.UserPasswordRecoverDTO;
import com.backend.lira.DTO.UserSignInDTO;
import com.backend.lira.DTO.UserSignUpDTO;
import com.backend.lira.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/security")
@Validated
public class SecurityController {

    @Autowired
    SecurityService securityService;

    @PostMapping("/signup")
    public ResponseEntity < Object > signUp(@RequestBody UserSignUpDTO userSignUpDTO) {
        try {
            return ResponseEntity.ok().body(securityService.signUp(userSignUpDTO));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao tentar cadastrar usuário");
        }
    }

    @PostMapping("/signin")
    public ResponseEntity < Object > login(@RequestBody UserSignInDTO userSignInDTO) {
        try {
            return ResponseEntity.ok().body(securityService.signIn(userSignInDTO));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao tentar logar");
        }
    }

    @PostMapping("/recovery")
    public ResponseEntity < Object > recoverPassword(@RequestBody UserPasswordRecoverDTO userPasswordRecoverDTO) {
        try {
            return ResponseEntity.ok().body(securityService.recoverPassword(userPasswordRecoverDTO));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao alterar senha");
        }
    }
}