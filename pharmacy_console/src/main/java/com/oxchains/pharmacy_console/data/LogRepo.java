package com.oxchains.pharmacy_console.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.oxchains.pharmacy_console.domain.Log;

@Repository
public interface LogRepo extends CrudRepository<Log, Long>{
	Log findByUsername(String username);
}
