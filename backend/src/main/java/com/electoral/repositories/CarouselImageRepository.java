package com.electoral.repositories;

import com.electoral.entities.CarouselImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarouselImageRepository extends JpaRepository<CarouselImage, Long> {
    List<CarouselImage> findAllByOrderByOrdenAsc();

    @Query("SELECT MAX(c.orden) FROM CarouselImage c")
    Optional<Integer> findMaxOrden();
}
