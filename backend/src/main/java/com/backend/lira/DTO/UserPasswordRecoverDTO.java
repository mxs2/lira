package com.backend.lira.DTO;

public record UserPasswordRecoverDTO(
        String email,
        String code
) {}