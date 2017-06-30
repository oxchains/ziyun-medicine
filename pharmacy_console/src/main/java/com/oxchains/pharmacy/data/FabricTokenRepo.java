package com.oxchains.pharmacy.data;

import com.oxchains.pharmacy.domain.FabricToken;
import com.oxchains.pharmacy.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * @author aiet
 */
public interface FabricTokenRepo extends CrudRepository<FabricToken, Long>{

  Optional<FabricToken> findByUser(User user);

}
