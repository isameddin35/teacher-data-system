package com.pms.service;

import com.pms.models.User;
import com.pms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;

    public boolean authenticate(String username, String password) {
        boolean authState = false;
        User foundUser;
        Optional<User> optional = userRepository.findByUsername(username);
        if (optional.isPresent()) {
            foundUser = optional.get();
            if (foundUser.getPassword().equals(password)) {
                authState = true;
            }
        }
        return authState;


    }

    public User getUser(String username) {
        Optional<User> optional = userRepository.findByUsername(username);
        if (optional.isPresent()) {
            return optional.get();
        } else return null;
    }
}
