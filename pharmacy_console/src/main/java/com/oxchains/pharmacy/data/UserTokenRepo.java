package com.oxchains.pharmacy.data;

import com.oxchains.pharmacy.domain.UserToken;
import org.springframework.data.repository.CrudRepository;

/**
 * @author aiet
 */
public interface UserTokenRepo extends CrudRepository<UserToken, String> {
}
