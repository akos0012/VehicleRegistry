package hu.spring.akos0012.server.controller;

import hu.spring.akos0012.server.dto.brandrequest.BrandRequestCreateDTO;
import hu.spring.akos0012.server.dto.brandrequest.BrandRequestResponseDTO;
import hu.spring.akos0012.server.dto.brandrequest.BrandRequestUpdateDTO;
import hu.spring.akos0012.server.service.BrandRequestService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brand-request")
public class BrandRequestController {
    private final BrandRequestService brandRequestService;

    public BrandRequestController(BrandRequestService brandRequestService) {
        this.brandRequestService = brandRequestService;
    }

    @GetMapping
    public ResponseEntity<List<BrandRequestResponseDTO>> findAll() {
        return ResponseEntity.ok(brandRequestService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BrandRequestResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(brandRequestService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody @Valid BrandRequestCreateDTO requestCreateDTO) {
        brandRequestService.create(requestCreateDTO);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<BrandRequestResponseDTO> update(@PathVariable Long id, @RequestBody @Valid BrandRequestUpdateDTO requestUpdateDTO) {
        BrandRequestResponseDTO updatedRequest = brandRequestService.update(id, requestUpdateDTO);
        return ResponseEntity.ok(updatedRequest);
    }
}
