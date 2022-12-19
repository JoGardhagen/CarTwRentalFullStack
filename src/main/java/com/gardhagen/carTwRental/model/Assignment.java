package com.gardhagen.carTwRental.model;

import javax.persistence.*;

@Entity
public class Assignment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String status;
    private String githubUrl;
    private String branch;
    private String CodeReviewVideoUrl;
    @ManyToOne(optional = false)
    private UserEntity userEntity;
//    private UserEntity assignedTo;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getCodeReviewVideoUrl() {
        return CodeReviewVideoUrl;
    }

    public void setCodeReviewVideoUrl(String codeReviewVideoUrl) {
        CodeReviewVideoUrl = codeReviewVideoUrl;
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }
}
