package com.backend.lira.DTO;

public record UserSignUpDTO(
        String email,
        String name,
        String password
) {}