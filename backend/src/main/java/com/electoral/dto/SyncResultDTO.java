package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class SyncResultDTO {
    private String operationId;
    private boolean success;
    private Long serverId;
    private String error;
}
