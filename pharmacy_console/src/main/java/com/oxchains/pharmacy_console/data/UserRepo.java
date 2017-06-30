package com.oxchains.pharmacy_console.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.oxchains.pharmacy_console.domain.User;


@Repository
public interface UserRepo extends CrudRepository<User, Long>{
	com.oxchains.pharmacy_console.domain.User findByUsername(String username);
}
