import {
    currTransitionSetupFsm,
    hasCompletedSetup,
    patchProject,
    resetSetup,
    setSetupStep,
    transitionSetupFsm,
    tryHasCompleteSetup,
    tryPatchProject,
    trySetAsync
} from "./setupApp";
import { SetupAppReducer } from "./setupApp.reducers";

describe("setup app store", () => {
    /***
     * setup.ts
     * */
    it("should dispatch setup set action",  () => {
        const A=1
        const EXPECTED={
            type:"SET_SETUP_STEP",
            payload:A
        }
        const value=setSetupStep(A as any)
        expect(value).toMatchObject(EXPECTED)
    })

    it("should dispatch setup completed action",  () => {
        const EXPECTED={
            type:"TRY_HAS_COMPLETED_SETUP",
            payload:true
        }
        const value=tryHasCompleteSetup()
        expect(value).toMatchObject(EXPECTED)
    })

    it("should dispatch setup has completed action",  () => {
        const EXPECTED={
            type:"HAS_COMPLETED_SETUP",
        }
        const value=hasCompletedSetup()
        expect(value).toMatchObject(EXPECTED)
    })

    it("should dispatch try patch setup action",  () => {
        const A={
            'a':"c"
        }
        const EXPECTED={
            type:"TRY_PATCH_PROJECT",
            payload:A
        }
        const value=tryPatchProject(A as any)
        expect(value).toMatchObject(EXPECTED)
    })
    it("should dispatch patch setup action",  () => {
        const A={
            'a':"c"
        }
        const EXPECTED={
            type:"PATCH_PROJECT",
            payload:A
        }
        const value=patchProject(A as any)
        expect(value).toMatchObject(EXPECTED)
    })
    it("should dispatch try set async action",  () => {
        const A={
            'a':"c"
        }
        const EXPECTED={
            type:"TRY_SET_ASYNC",
            payload:A
        }
        const value=trySetAsync(A as any)
        expect(value).toMatchObject(EXPECTED)
    })

    it("should dispatch next FSM action",  () => {
        const A={
            'a':"c"
        }
        const EXPECTED={
            type:"SETUP_FSM",
            payload:A
        }
        const value=currTransitionSetupFsm(A as any)(null)
        expect(value).toMatchObject(EXPECTED)
    })

    it("should set next FSM action",  () => {
        const A={
            'a':"c"
        }
        const EXPECTED={
            type:"SETUP_FSM",
            payload:A
        }
        const value=transitionSetupFsm(A as any)
        expect(value).toMatchObject(EXPECTED)
    })

    it("should  reset setup action",  () => {

        const EXPECTED={
            type:"RESET_SETUP",
        }
        const value=resetSetup()
        expect(value).toMatchObject(EXPECTED)
    })


    /***
     * setup.ts
     * */

    it("should  mutate setup app current setup",  () => {
        const A = "next"
        const B = {
            type: "SET_SETUP_STEP",
            payload: A
        }

        const value = SetupAppReducer({currentStep: null} as any, B)
        const EXPECTED = {
            currentStep: A
        }
        expect(value).toMatchObject(EXPECTED)
    })


    it("should  mutate partial setup app project",  () => {
        const A={
            "mock":"m"
        }
        const B={
            type:"PATCH_PROJECT",
            payload:A
        }

        const value=SetupAppReducer({ project: {
                mock:"a"
            }} as any,B )
        const EXPECTED={ project: A }
        expect(value).toMatchObject(EXPECTED)
    })


    it("should mutate set cache file setup app project",  () => {
        const A={"mock": "a"}
        const B={
            type:"SET_FILE_CACHE",
            payload:A
        }

        const value=SetupAppReducer({fileLocCache:{}} as any,B )
        const EXPECTED={ fileLocCache: { 'mock':"a"} }
        expect(value).toMatchObject(EXPECTED)
    })
    it("should mutate clear cache file setup app project",  () => {
        const A = {
            adt_loc_file: null,
            kwd_loc_file: null,
            imgb_loc_file: null,
            prod_loc_file: null,
        };

        const B: any = {
            type: "CLEAR_FILE_CACHE",
        }

        const value = SetupAppReducer({fileLocCache: {}} as any, B)
        const EXPECTED = {fileLocCache: A}
        expect(value).toMatchObject(EXPECTED)
    })





})
