package uk.gov.hmcts.reform.dev.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min=1, max=255)
    private String title;

    // optional field
    private String description;

    @NotNull
    private String status;

    @NotNull
    @FutureOrPresent(message = "Must be a date in the present or in the future")
    private LocalDate due;

    public Task(Long id, String title, String description, String status, LocalDate due) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.due = due;
    }

    public Task() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getDue() {
        return due;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDue(LocalDate due) {
        this.due = due;
    }

}
