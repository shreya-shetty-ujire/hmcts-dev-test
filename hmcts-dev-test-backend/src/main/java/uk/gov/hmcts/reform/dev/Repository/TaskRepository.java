package uk.gov.hmcts.reform.dev.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import uk.gov.hmcts.reform.dev.models.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
