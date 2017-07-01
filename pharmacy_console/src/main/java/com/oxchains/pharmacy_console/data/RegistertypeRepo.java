package com.oxchains.pharmacy_console.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.oxchains.pharmacy_console.domain.Registertype;

@Repository
public interface RegistertypeRepo extends CrudRepository<Registertype,Long>{

}
