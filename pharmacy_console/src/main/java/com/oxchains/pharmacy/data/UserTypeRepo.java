package com.oxchains.pharmacy.data;

import com.oxchains.pharmacy.domain.UserType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserTypeRepo extends CrudRepository<UserType, Long> {

  Optional<UserType> findByCode(int code);

}
