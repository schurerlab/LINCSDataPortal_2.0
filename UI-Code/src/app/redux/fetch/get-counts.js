import axios from 'axios';
import { url_server } from "../server";

import {
    setCountSmallMolecules, setCountshRNAs, setCountcDNAs,
    setCountAntibodies, setCountMicroevnironments,
    setCountPerterbationsTotal
} from "../actions/perturbations";

import {
    setCountCells, setCountCelltypes, setCountDiseases,
    setCountTissuetypes, setCountModelsystemsTotal
} from "../actions/modelsystems";

import {
    setCountCellPhenotype, setCountDoseResponse,
    setCountEpigenetic, setCountProteomic,
    setCountSignaturesTotal, setCountTranscriptional
} from "../actions/signatures";

export function getCounts(array_terms = []) {

    let terms = ""
    if (array_terms.length > 0)
        terms = "?term=" + encodeURI(array_terms.join());

    let target_url = url_server + "search/count" + terms;

    console.log(target_url);

    return dispatch => {

        axios.get(target_url)
            .then((response) => {

                let json_d = response.data.data

                let json_p = json_d.perturbagens;
                let json_m = json_d.modelSystems;
                let json_s = json_d.signatures;

                dispatch(setCountSmallMolecules(json_p.smallMolecule));
                dispatch(setCountshRNAs(json_p.nucleicAcidReagent));
                dispatch(setCountcDNAs(json_p.cDNAs));
                dispatch(setCountAntibodies(json_p.antibodies));
                dispatch(setCountMicroevnironments(json_p.microEvnironments));
                dispatch(setCountPerterbationsTotal(json_p.totalCount));

                dispatch(setCountCells(json_m.cells));
                dispatch(setCountCelltypes(json_m.cellTypes));
                dispatch(setCountDiseases(json_m.disease));
                dispatch(setCountTissuetypes(json_m.tissues));
                dispatch(setCountModelsystemsTotal(json_m.totalCount));

                dispatch(setCountCellPhenotype(json_s.phenotypes));
                dispatch(setCountDoseResponse(json_s.doseResponse));
                dispatch(setCountEpigenetic(json_s.geneExpression));
                dispatch(setCountProteomic(json_s.proteomic));
                dispatch(setCountTranscriptional(json_s.transcriptional));
                dispatch(setCountSignaturesTotal(json_s.totalCount));

            }
            ).catch((response) => console.log(response, 'fetch failure !!!'));

    }
}

