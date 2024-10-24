package com.tetraleague.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Document(collection = "rounds")
public class Round {
    @Id
    private String id;
    private int roundNumber;
    private List<String> matchIds;

    public Round(int roundNumber, List<String> matchIds) {
        this.roundNumber = roundNumber;
        this.matchIds = matchIds;
    }
}
