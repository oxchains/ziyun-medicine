package com.oxchains.pharmacy.data;

import com.oxchains.pharmacy.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends CrudRepository<User, Long> {

  Optional<User> findByUsername(String username);

  Optional<User> findById(Long id);

  Iterable<User> findByAuthenticated(int authenticated);

  Optional<User> findByUsernameAndPassword(String username, String password);

  Optional<User> findByEmail(String email);

}
