import axios from './AxiosUtils';

const getDataFromResponseAsPromise = (response) => {
    return Promise.resolve(response.data);
}

export const getAllTestsOfUser = () => {
    return axios.get('/tests').then(getDataFromResponseAsPromise);
}

export const createTest = (testName) => {
    return axios.post('/tests', {
        testName
    });
}

export const getTestById = (testId) => {
    return axios.get(`/tests/${testId}`).then(getDataFromResponseAsPromise);
}

export const getAllQuestionsOfTest = (testId) => {
    return axios.get(`/tests/${testId}/questions`).then(getDataFromResponseAsPromise);
}

export const getQuestionOfTest = (questionId) => {
    return axios.get(`/tests/questions/${questionId}`).then(getDataFromResponseAsPromise);
}

export const createQuestion = (testId, questionText, initialQuestionOptions) => {
    return axios.post(`/tests/${testId}/questions`, {
        questionText,
        initialQuestionOptions
    }).then(getDataFromResponseAsPromise);
}

export const addQuestionOptionToQuestion = (questionId, questionOptionText) => {
    return axios.post(`/tests/questions/${questionId}/options`, {
        questionOptionText
    }).then(getDataFromResponseAsPromise);
}

export const updateCorrectQuestionOption = (questionId, newCorrectQuestionOptionId) => {
    return axios.put(`/tests/questions/${questionId}/correctOption`, {
        questionOptionId: newCorrectQuestionOptionId
    }).then(getDataFromResponseAsPromise);
}

export const deleteQuestionOption = (questionOptionId) => {
    return axios.delete(`/tests/question-options/${questionOptionId}`);
}