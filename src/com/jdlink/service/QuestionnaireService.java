package com.jdlink.service;

import com.jdlink.domain.Questionnaire;
import com.jdlink.domain.QuestionnaireAdmin;

import java.util.List;

/**
 * Created by matt on 2018/4/28.
 */
public interface QuestionnaireService {
    List<Questionnaire> list();
    List<Questionnaire> search(String keyword);
    Questionnaire getById(String questionnaireId);
    List<Questionnaire> getByClientId(String clientId);
    List<QuestionnaireAdmin> listQuestionnaireAdmin();
    void add(Questionnaire questionnaire);
    void delete(String questionnaireId);
    void update(Questionnaire questionnaire);
    int count();
    void signIn(String questionnaireId);
    void updateAttachmentUrl(Questionnaire questionnaire);
    void back(String quesionnaireId);
    void examine(String questionnaireId);
}
