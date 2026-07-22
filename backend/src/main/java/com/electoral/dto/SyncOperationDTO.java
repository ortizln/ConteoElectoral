package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class SyncOperationDTO {
    private String operationId;
    private String entity;
    private String action;
    private Long entityId;
    private Map<String, Object> data;
    private String timestamp;
}
