package com.electoral.services;

import com.electoral.entities.CarouselImage;
import com.electoral.repositories.CarouselImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CarouselImageService {
    private final CarouselImageRepository repository;

    @Transactional(readOnly = true)
    public List<CarouselImage> getAllImages() {
        return repository.findAllByOrderByOrdenAsc();
    }

    @Transactional
    public CarouselImage saveImage(String caption, byte[] imageData, Integer orden) {
        if (orden == null) {
            orden = repository.findMaxOrden().orElse(0) + 1;
        }
        CarouselImage image = CarouselImage.builder()
                .caption(caption)
                .imageData(imageData)
                .orden(orden)
                .build();
        return repository.save(image);
    }

    @Transactional
    public CarouselImage updateImage(Long id, String caption, Integer orden) {
        CarouselImage image = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Imagen no encontrada: " + id));
        if (caption != null) image.setCaption(caption);
        if (orden != null) image.setOrden(orden);
        return repository.save(image);
    }

    @Transactional
    public void deleteImage(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Imagen no encontrada: " + id);
        }
        repository.deleteById(id);
    }
}
