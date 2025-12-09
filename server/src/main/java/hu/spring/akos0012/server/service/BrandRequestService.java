package hu.spring.akos0012.server.service;

import hu.spring.akos0012.server.dto.brandrequest.BrandRequestCreateDTO;
import hu.spring.akos0012.server.dto.brandrequest.BrandRequestResponseDTO;
import hu.spring.akos0012.server.dto.brandrequest.BrandRequestUpdateDTO;
import hu.spring.akos0012.server.mapper.BrandRequestMapper;
import hu.spring.akos0012.server.model.BrandRequest;
import hu.spring.akos0012.server.model.User;
import hu.spring.akos0012.server.repository.BrandRequestRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandRequestService {

    private final BrandRequestRepository brandRequestRepository;
    private final BrandRequestMapper brandRequestMapper;

    private final UserService userService;

    public BrandRequestService(BrandRequestRepository brandRequestRepository, BrandRequestMapper brandRequestMapper, UserService userService) {
        this.brandRequestRepository = brandRequestRepository;
        this.brandRequestMapper = brandRequestMapper;
        this.userService = userService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<BrandRequestResponseDTO> findAll() {
        return brandRequestMapper.toDtoList(brandRequestRepository.findAll());
    }

    @PreAuthorize("hasRole('ADMIN')")
    public BrandRequestResponseDTO findById(Long id) {
        BrandRequest brandRequest = brandRequestRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("brand request not found with ID: " + id));

        return brandRequestMapper.toDto(brandRequest);
    }

    public void create(BrandRequestCreateDTO requestCreateDTO) {
        Long userId = requestCreateDTO.userId();

        if (!userService.existsById(userId))
            throw new EntityNotFoundException("User not found");

        User user = new User();
        user.setId(userId);
        String brandName = requestCreateDTO.brandName();
        String message = requestCreateDTO.message();

        BrandRequest brandRequest = new BrandRequest(brandName, message, user);
        brandRequestRepository.save(brandRequest);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public BrandRequestResponseDTO update(Long id, BrandRequestUpdateDTO requestUpdateDTO) {
        BrandRequest brandRequest = brandRequestRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("brand request not found with ID: " + id));

        brandRequest.setStatus(requestUpdateDTO.status());

        return brandRequestMapper.toDto(brandRequestRepository.save(brandRequest));
    }
}
